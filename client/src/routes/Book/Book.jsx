import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Book() {
    const baseUrl = "http://localhost:8000/api/books"
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                let url = baseUrl
                if(selectedCategory){
                    url += `?category=${selectedCategory}`
                }

                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error("Failed to fetch data")
                }

                const jsonData = await response.json()
                setData(jsonData)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                setError("Error fecthing data. Please try again later")
            }
        }

        fetchData()
    }, [selectedCategory])

    return (
        <div>
            <h1>Books</h1>
            <p>This is where we&apos;ll put all the books</p>

            <Link to="/books/create">+ Add new book</Link>
            <h2>Fetch example</h2>


            <div className="filters">
                <label>Categories</label>
                <select onChange={e => setSelectedCategory(e.target.value)}>
                    <option value="">All</option>
                    <option value="romance">Romance</option>
                    <option value="fiction">Fiction</option>
                    <option value="science">Science</option>
                    <option value="crime">Crime</option>
                    <option value="adventure">Adventure</option>
                    <option value="food">Food</option>
                    <option value="thriller">Thriller</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {isLoading ?
                <p>Loading...</p> :
                error ?
                    <p>{error}</p> :
                    <ul className="books">
                        {data.map(d => (
                            <li key={d._id}>
                                <Link to={`/books/${d.slug}`}>
                                    <img src={`http://localhost:8000/uploads/${d.thumbnail}`} alt={d.title} />
                                    <h3>{d.title}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>}
        </div>
    )
}

export default Book