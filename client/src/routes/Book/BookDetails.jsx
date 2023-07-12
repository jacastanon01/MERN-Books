import { useParams, Link } from "react-router-dom"
import { useState, useEffect} from "react"

function BookDetails() {
    const {slug} = useParams()
    const baseUrl = `http://localhost:8000/api/books/${slug}`
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {          
                const response = await fetch(baseUrl)
                if (!response.ok) {
                    throw new Error("Failed to fetch data")
                }

                const jsonData = await response.json()
                setData(jsonData)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    function StarRating({numOfStars}){
        const stars = []

        for (let i=0; i< numOfStars; i++){
            stars.push(<span key={i}>⭐️</span>)
        }
        console.log(numOfStars)
        return <div>Rating: {stars}</div>
    }

    return (
        <div>
            <Link to={"/books"}>
                📘 Books
            </Link>

            <article className="bookdetails">
                <div className="col-1">
                    <img src={`http://localhost:8000/uploads/${data?.thumbnail}`} alt={data.title}/>
                    <Link to={`/books/edit/${slug}`}>Edit</Link>
                </div>
                <div className="col-2">
                    <h1>{data?.title}</h1>
                    <p>{data?.description}</p>
                    <StarRating numOfStars={data?.stars} />

                    <p>Category</p>
                    <ul>
                        {data?.category?.map((item, i)=> (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            </article>
        </div>
    )
}

export default BookDetails