import React, { Component } from "react";
import { getToken } from "../services/authService";

export class NewsItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false,
      saved: false,
      message: ""
    };
  }

  componentDidMount() {
    this.checkIfNewsSaved();
  }

  componentDidUpdate(prevProps) {
    // Check again if a different news article is loaded
    if (prevProps.newsUrl !== this.props.newsUrl) {
      this.setState({
        saved: false,
        message: ""
      });

      this.checkIfNewsSaved();
    }
  }

  // Check whether this news is already saved
  checkIfNewsSaved = async () => {
    const token = getToken();

    // If user is not logged in, don't check saved news
    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/saved-news",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      // Check whether current article already exists
      const alreadySaved = data.savedNews.some(
        (item) => item.url === this.props.newsUrl
      );

      if (alreadySaved) {
        this.setState({
          saved: true
        });
      }
    } catch (error) {
      console.error("Check Saved News Error:", error);
    }
  };

  handleSaveNews = async () => {
    const token = getToken();

    // --------------------------------
    // USER NOT LOGGED IN
    // --------------------------------
    if (!token) {
      this.setState({
        saving: false,
        saved: false,
        message: "Please login first to save this news."
      });

      return;
    }

    const {
      title,
      description,
      imageUrl,
      newsUrl,
      date,
      source
    } = this.props;

    // --------------------------------
    // CHECK NEWS INFORMATION
    // --------------------------------
    if (!title || !newsUrl) {
      this.setState({
        message: "News information is incomplete."
      });

      return;
    }

    this.setState({
      saving: true,
      message: ""
    });

    try {
      const response = await fetch(
        "http://localhost:5000/api/saved-news",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            title: title,
            description: description || "",
            url: newsUrl,
            urlToImage: imageUrl || "",
            source: source || "",
            publishedAt: date || ""
          })
        }
      );

      const data = await response.json();

      console.log("Save News Response:", data);

      // --------------------------------
      // ALREADY SAVED
      // --------------------------------
      if (
        response.status === 400 &&
        data.message === "News already saved."
      ) {
        this.setState({
          saving: false,
          saved: true,
          message: "This news is already saved."
        });

        return;
      }

      // --------------------------------
      // OTHER ERROR
      // --------------------------------
      if (!response.ok) {
        this.setState({
          saving: false,
          saved: false,
          message: data.message || "Unable to save news."
        });

        return;
      }

      // --------------------------------
      // SUCCESS
      // --------------------------------
      this.setState({
        saving: false,
        saved: true,
        message: "News saved successfully."
      });
    } catch (error) {
      console.error("Save News Error:", error);

      this.setState({
        saving: false,
        saved: false,
        message: "Unable to connect to backend."
      });
    }
  };

  render() {
    const {
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      date,
      source
    } = this.props;

    return (
      <div className="my-3">
        <div className="card">

          {/* Source */}
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{
              left: "90%",
              zIndex: "1"
            }}
          >
            {source}

            <span className="visually-hidden">
              unread messages
            </span>
          </span>

          {/* Image */}
          <img
            src={
              !imageUrl
                ? "https://c.ndtvimg.com/2023-02/4d7qecfo_tax-generic_625x300_02_February_23.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt={title}
          />

          <div className="card-body">

            {/* Title */}
            <h5 className="card-title">
              {title}
            </h5>

            {/* Description */}
            <p className="card-text">
              {description}...
            </p>

            {/* Author and Date */}
            <p className="card-text text-danger">
              <small className="text-danger">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>

            {/* Buttons */}
            <div className="d-flex gap-2">

              {/* Read More */}
              <a
                rel="noreferrer"
                href={newsUrl}
                target="_blank"
                className="btn btn-sm btn-primary"
              >
                Read More
              </a>

              {/* Save News */}
              <button
                type="button"
                className={
                  this.state.saved
                    ? "btn btn-sm btn-success"
                    : "btn btn-sm btn-outline-primary"
                }
                onClick={this.handleSaveNews}
                disabled={this.state.saving || this.state.saved}
              >
                {this.state.saving
                  ? "Saving..."
                  : this.state.saved
                  ? "Saved ✓"
                  : "Save News"}
              </button>

            </div>

            {/* Message */}
            {this.state.message && (
              <small
                className={
                  this.state.saved
                    ? "text-success d-block mt-2"
                    : "text-danger d-block mt-2"
                }
              >
                {this.state.message}
              </small>
            )}

          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
