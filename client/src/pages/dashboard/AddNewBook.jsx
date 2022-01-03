import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import Topbar from "../../components/topbar/Topbar";

const AddNewBook = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = {
      title: title,
      author: author,
      image: image,
      publishDate: publishDate,
      description: description,
      price: price,
      category: category,
      publisher: publisher,
      pages: pages,
      dimensions: dimensions,
      language: language,
      aboutAuthor: aboutAuthor,
    };
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/books", book);
      setLoading(false);
      res && setSuccess("Book added successfully");
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
    window.scroll(0, 0);
  }, []);

  return (
    <div>
      <Topbar />
      <Container fluid="xl" className="my-5">
        <Row className="align-items-center justify-content-center">
          <Col lg={8}>
            <div className="title-header">
              <h2 className="auth-form-header">Add New Book</h2>
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
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label>Author</label>
                <input
                  type="text"
                  placeholder="Author"
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
              </div>
              <div>
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
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
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
                Add Book
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddNewBook;
