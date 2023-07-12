import { useRef, useState } from 'react'
import noImageSelected from "../../assets/no-image-selected.jpg"
import { Form } from 'react-router-dom'

function AddBook() {
    const [newBook, setNewBook] = useState({
        title: "",
        //thumbnail: noImageSelected,
        categories: [],
        description: "",
        createdAt: new Date(),
        stars: null,
        slug: ""
    })
    const fileRef = useRef()
    const [submitted, setSubmitted] = useState(false)
    const [image, setImage] = useState(noImageSelected)

    function handleImageChange(e){
        console.log(e.target.files)
        if (e.target.files && e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0]))
            newBook({
                    ...newBook,
                    thumbnail: e.target.files[0]
                
            })
        }
    }

    function handleFormInput(e) {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value
        })

    }

    async function handleSubmit(e) {
        console.log(e.formData)
        e.preventDefault()
        const formData = new FormData()
        const {title, slug, description, stars, categories } = newBook
        formData.append("title", title)
        formData.append("slug", slug);
        formData.append("stars", stars);
        formData.append("description", description);
        formData.append("category", categories);
        console.log(formData)

        try {
            const response = await fetch('http://localhost:8000/api/books', {
                method: "POST",
                // headers: {
                //     "Content-Type": "application/json"
                // },
                body: formData
                // body: JSON.stringify(newBook)
            })

            console.log(response)
            if (response.ok) {
                console.log("HELLO FROM INSIDE THE FUCKINGT HING")
                setNewBook({
                    title: "",
                    category: [],
                    description: "",
                    createdAt: new Date(),
                    stars: null,
                    slug: ""
                })
                setSubmitted(true)
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <h1>Create book</h1>
            <p>This is where we use Node, Express and MongoDB to create a new Book model in the DB collection. We will grab user input as state and then pass it to our api host</p>
            {submitted ? <p>Book has been submitted!</p> :
                <form onSubmit={handleSubmit} className="bookdetails">
                    <div className="col-1">
                        <label>Upload Thumbnail</label>
                        <img src={image} alt="preview thumbnail" />
                        <input 
                           // onChange={handleImageChange} 
                            type="file" 
                            accept="image/gif, image/jpeg, image/png" 
                        />
                    </div>
                    <div className="col-2">
                        <label>Title</label>
                        <input type="text" name="title" defaultValue={newBook.title} onChange={handleFormInput} />
                        <label>Description</label>
                        <textarea defaultValue={newBook.description} onChange={handleFormInput} name="description" />
                        <label>Rating</label>
                        <input type="number" max="5" name="stars" defaultValue={newBook.stars} onChange={handleFormInput} />
                        <label>Slug</label>
                        <input type="text" name="slug" defaultValue={newBook.slug} onChange={handleFormInput} />
                        <input type="submit" value="Add new book" />
                    </div>
                </form>
            }
        </>
    )
}

// function AddBook(){
//     <Form method="post">

//     </Form>
// }

export default AddBook