import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import { getNews } from "../services/newsService";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
    query: ""
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    query: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      error: null
    };

    document.title = this.getPageTitle();
  }

  // Create a clean page title
  getPageTitle = () => {
    if (this.props.query) {
      return `${this.props.query} - NewsMonkey AI`;
    }

    return `${this.capitalizeFirstLetter(
      this.props.category
    )} News - NewsMonkey AI`;
  };

  capitalizeFirstLetter = (string) => {
    if (!string) {
      return "";
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Fetch news through our backend service
  updateNews = async (pageNo = 1) => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      const data = await getNews({
        country: this.props.country,
        category: this.props.category,
        page: pageNo,
        pageSize: this.props.pageSize,
        query: this.props.query
      });

      this.setState({
        articles: data.articles || [],
        totalResults: data.totalResults || 0,
        page: pageNo,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error(
        "NewsMonkey AI Frontend Error:",
        error
      );

      this.setState({
        articles: [],
        loading: false,
        error:
          error.message ||
          "Unable to fetch news."
      });
    }
  };

  componentDidMount() {
    this.updateNews(1);
  }

  // Previous page
  handlePrev = () => {
    if (this.state.page <= 1) {
      return;
    }

    this.updateNews(this.state.page - 1);
  };

  // Next page
  handleNext = () => {
    const totalPages = Math.ceil(
      this.state.totalResults /
        this.props.pageSize
    );

    if (this.state.page >= totalPages) {
      return;
    }

    this.updateNews(this.state.page + 1);
  };

  render() {
    const {
      articles,
      loading,
      error,
      page,
      totalResults
    } = this.state;

    const {
      pageSize,
      category,
      query
    } = this.props;

    const totalPages = Math.ceil(
      totalResults / pageSize
    );

    return (
      <div className="container my-4">

        {/* Page Heading */}
        <div className="text-center mb-4">

          {query ? (
            <>
              <span className="badge bg-primary mb-2">
                🔍 SEARCH RESULTS
              </span>

              <h2 className="fw-bold">
                Results for "{query}"
              </h2>

              <p className="text-muted">
                Latest news related to your search.
              </p>
            </>
          ) : (
            <>
              <span className="badge bg-dark mb-2">
                📰 NEWSMONKEY AI
              </span>

              <h2 className="fw-bold">
                Top{" "}
                {this.capitalizeFirstLetter(category)}{" "}
                Headlines
              </h2>

              <p className="text-muted">
                Latest {category} news and updates.
              </p>
            </>
          )}

        </div>

        {/* Loading */}
        {loading && (
          <div className="py-4">
            <Spinner />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="alert alert-danger text-center shadow-sm"
            role="alert"
          >
            <h5 className="fw-bold">
              ⚠️ Something went wrong
            </h5>

            <p className="mb-3">
              {error}
            </p>

            <button
              className="btn btn-danger"
              onClick={() =>
                this.updateNews(page)
              }
            >
              🔄 Try Again
            </button>
          </div>
        )}

        {/* No Articles */}
        {!loading &&
          !error &&
          articles.length === 0 && (
            <div
              className="alert alert-warning text-center"
              role="alert"
            >
              <h5 className="fw-bold">
                📰 No news found
              </h5>

              <p className="mb-0">
                We couldn't find any articles
                at the moment.
              </p>
            </div>
          )}

        {/* Articles */}
        {!loading &&
          !error &&
          articles.length > 0 && (
            <>
              <div className="row">

                {articles.map(
                  (article, index) => (
                    <div
                      className="col-sm-12 col-md-6 col-lg-4 mb-4"
                      key={
                        article.url ||
                        `${article.title}-${index}`
                      }
                    >
                      <NewsItem
                        title={
                          article.title ||
                          "Untitled News"
                        }

                        description={
                          article.description
                            ? article.description.slice(
                                0,
                                150
                              )
                            : "No description available."
                        }

                        imageUrl={
                          article.urlToImage
                        }

                        newsUrl={
                          article.url
                        }

                        author={
                          article.author ||
                          "Unknown Author"
                        }

                        date={
                          article.publishedAt
                        }

                        source={
                          article.source
                            ? article.source.name
                            : "Unknown"
                        }
                      />
                    </div>
                  )
                )}

              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-4 mb-5">

                <button
                  disabled={page <= 1}
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={this.handlePrev}
                >
                  ← Previous
                </button>

                <div className="text-center">
                  <span className="fw-semibold">
                    Page {page}
                  </span>

                  {totalPages > 0 && (
                    <span className="text-muted">
                      {" "}
                      of {totalPages}
                    </span>
                  )}
                </div>

                <button
                  disabled={
                    page >= totalPages
                  }
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={this.handleNext}
                >
                  Next →
                </button>

              </div>
            </>
          )}

      </div>
    );
  }
}

export default News;