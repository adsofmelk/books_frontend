import { useRouter } from "next/router";
import { useState } from "react"


export async function getServerSideProps({params}){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`)
    const data = await res.json()

    return {
        props : {
            book : data
        }
    }
}

const BookEdit = ({book}) => {

    const router = useRouter()
    const [Title, setTitle] = useState(book.title)
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)


    async function handleSubmit(e) {

        e.preventDefault()

        setSubmitting(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: Title,
                _method : 'PATCH'
            })
        })

        if (res.ok) {
            setErrors([])
            setTitle('')
            return router.push('/libros')

        }
        const data = await res.json()
        setErrors(data.errors)
        setSubmitting(false)
    }


    return (
        <div>
            <h1>Editar Libro</h1>
            <p>{Title}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                    value={Title}  
                    data-cy='input-book-title'
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={submitting} />
                <button 
                    data-cy='button-submit-book'
                    disabled={submitting}>{submitting ? 'Enviando...' : 'Enviar'}</button>

                {errors.title && (
                    <span style={{
                        color: 'red',
                        display: 'block'

                    }}>{errors.title}</span>
                )}

            </form>
        </div>
    )

}

export default BookEdit