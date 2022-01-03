import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Topbar from "../../components/topbar/Topbar";

const UpdateBook = () => {
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pages, setPages] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [language, setLanguage] = useState("");
  const [aboutAuthor, setAboutAuthor] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // calling category api
  const [categories, setCategories] = useState([]);

  // get parameter id
  const { id } = useParams();

  const getBookDetails = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/books/find?bookId=${id}`
    );

    setContent(data);
    setTitle(data.title && data.title);
    setAuthor(data.author && data.author);
    setDescription(data.description && data.description);
    setPrice(data.price && data.price);
    setPublisher(data.publisher && data.publisher);
    setPages(data.pages && data.pages);
    setDimensions(data.dimensions && data.dimensions);
    setLanguage(data.language && data.language);
    setAboutAuthor(data.aboutAuthor && data.aboutAuthor);
  };
  useEffect(() => {
    getBookDetails();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = {
      title: title ? title : content.title,
      author: author ? author : content.author,
      image: image ? image : content.image,
      publishDate: publishDate ? publishDate : content.publishDate,
      description: description ? description : content.description,
      price: price ? price : content.price,
      category: category ? category : content.category,
      publisher: publisher ? publisher : content.publisher,
      pages: pages ? pages : content.pages,
      dimensions: dimensions ? dimensions : content.dimensions,
      language: language ? language : content.language,
      aboutAuthor: aboutAuthor ? aboutAuthor : content.aboutAuthor,
    };
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/books/${id}`,
        book
      );
      setLoading(false);
      res && setSuccess("Book updated successfully");
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  const uploadImage = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "deedon");

      fetch("https://api.cloudinary.com/v1_1/deedon/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please select an image");
    }
  };

  const getCategories = async () => {
    const { data } = await axios.get("http://localhost:5000/api/category");
    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Topbar />
      <Container fluid="xl">
        <Row className="align-items-center justify-content-center my-5">
          <Col lg={8}>
            <div className="title-header">
              <h2 className="auth-form-header">Update {id}</h2>
            </div>
            <div>
              {error && !success && <Alert variant="danger"> {error}</Alert>}
            </div>
            <div>{success && <Alert variant="success"> {success}</Alert>}</div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  placeholder={content.title}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label>Author</label>
                <input
                  type="text"
                  placeholder={content.author}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div>
                <label>Select an Image</label>
                <input
                  type="file"
                  onChange={(e) => uploadImage(e.target.files[0])}
                />
                <label>Publish Date</label>
                <input
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  type="text"
                  placeholder={content.description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label>Category</label>
                <select
                  name="category"
                  id=""
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">--Select Category--</option>
                  {categories.map((category) => {
                    return (
                      <option key={category._id} value={category.title}>
                        {category.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>Publisher</label>
                <input
                  type="text"
                  placeholder="Publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                />
              </div>
              <div>
                <label>Pages</label>
                <input
                  type="text"
                  placeholder="Number of Pages"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                />
              </div>
              <div>
                <label>Dimensions</label>
                <input
                  type="text"
                  placeholder="Dimension"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                />
              </div>
              <div>
                <label>Language</label>
                <input
                  type="text"
                  placeholder="Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </div>
              <div>
                <label>About the author</label>
                <textarea
                  type="text"
                  placeholder="About author"
                  value={aboutAuthor}
                  onChange={(e) => setAboutAuthor(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-button">
                {loading && (
                  <Spinner
                    className="submit-loader"
                    animation="border"
                    size="sm"
                  />
                )}{" "}
                Update Book
              </button>
            </form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default UpdateBook;
