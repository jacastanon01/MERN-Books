import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import NoImageSelected from "../../assets/no-image-selected.jpg";

function EditBook() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [stars, setStars] = useState(0);
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [submitted, setSubmitted] = useState("");
    const [image, setImage] = useState("")
    const [bookId, setBookId] = useState(null)

    const slugParam = useParams()
    const baseURL = `http://localhost:8000/api/books/${slugParam.slug}`
    const navigate = useNavigate()
    console.log(baseURL)

    const fetchData = async () => {
        try {
            const response = await fetch(baseURL)

            if (!response.ok) {
                throw new Error("Trouble fetching data")
            }

            const data = await response.json()
            // const { title, description, category, stars, thumbnail, slug, _id } = data
            setTitle(data.title)
            setThumbnail(data.thumbnail)
            setStars(data.stars)
            setCategories(data.category)
            setDescription(data.description)
            setSlug(data.slug)
            setBookId(data._id)

        } catch (error) {
            console.log(error)
        }
    }

    const createBook = async (e) => {
        e.preventDefault();
        console.table([title, slug]);


        const formData = new FormData();
        formData.append("title", title);
        formData.append("bookId", bookId)
        formData.append("slug", slug);
        formData.append("stars", stars);
        formData.append("description", description);
        formData.append("category", categories);
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);

        }

        try {

            const response = await fetch("http://localhost:8000/api/books", {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                setTitle("");
                setSlug("");
                setSubmitted(true);
            } else {
                console.log("Failed to submit data.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCategoryChange = (e) => {
        setCategories(e.target.value.split(",").map((category) => category.trim()));
    }

    const removeBook = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(
            "http://localhost:8000/api/books/" + bookId,
            {
              method: "DELETE",
            }
          );
    
          if (response.ok) {
            navigate("/books");
            console.log("Book removed.");
          }
        } catch (error) {
          console.error(error);
        }
      };
    const handleDelete = async (e) => {
        //console.log("FUCKFUCKFUCKF")
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/api/books/${bookId}`, {
                method: "DELETE"
            })
            console.log(response)

            if (response.ok) {
                navigate('/books')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setThumbnail(e.target.files[0]);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <h1>Edit Book</h1>
            <p>
                This is where we use NodeJs, Express & MongoDB to grab some data. The
                data below is pulled from a MongoDB database.
            </p>
            <button className="delete" onClick={removeBook}>Remove book</button>
            {submitted ? (
                <p>Data subitted successfully!</p>
            ) : (
                <form className="bookdetails" onSubmit={createBook}>
                    <div className="col-1">
                        <label>Upload Thumbnail</label>
                        {image ? (
                            <img src={`${image}`} alt="preview image" />
                        ) : (
                            <img src={`http://localhost:8000/uploads/${thumbnail}`} alt="preview image" />
                        )}
                        <input
                            onChange={onImageChange}
                            type="file" accept="image/gif, image/jpeg, image/png" />
                    </div>
                    <div className="col-2">
                        <div>
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Slug</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Stars</label>
                            <input
                                type="text"
                                value={stars}
                                onChange={(e) => setStars(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Description</label>
                            <textarea
                                rows="4"
                                cols="50"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Categories (comma-seperated)</label>
                            <input
                                type="text"
                                value={categories}
                                onChange={handleCategoryChange}
                            />
                        </div>

                        <input type="submit" />
                    </div>
                </form>
            )}
        </div>
    );
}

export default EditBook