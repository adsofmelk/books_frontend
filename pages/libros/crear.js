import { useRouter } from "next/router";
import { useState } from "react"


const BookCreate = () => {

    const router = useRouter()
    const [Title, setTitle] = useState('')
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)
    

    async function handleSubmit(e) {
        
        e.preventDefault()
        
        setSubmitting(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
            method  :   'POST',
            headers :   {
                accept : 'application/json',
                'content-type' : 'application/json'
            },
            body    :   JSON.stringify({
                title : Title
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
            <h1>Crear Libro</h1>
            <p>{Title}</p>
            <form value={Title}
                onChange={(e)=> setTitle(e.target.value)}
                onSubmit={handleSubmit}>
                <input type="text" disabled={submitting} data-cy="input-book-title"/>
                <button data-cy='button-submit-book' disabled={submitting}>{submitting ? 'Enviando...' : 'Enviar'}</button>

                {errors.title && (
                    <span style={{
                        color : 'red',
                        display : 'block'

                    }}>{errors.title}</span>
                )}

            </form>
        </div>
    )

}

export default BookCreate