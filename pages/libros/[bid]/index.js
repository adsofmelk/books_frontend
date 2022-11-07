import Link from "next/link"

export async function getStaticProps({params}) {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`)

    const data = await res.json()

    return {
        props: {
            book: data
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)

    const data = await res.json()

    return {
        paths: data.map(book => ({
            params: { bid: String(book.id) }
        })),
        fallback: false
    }
}

const BookDetail = ({ book }) => {
    console.log(book)
    return (
        <div>
            <Link href={`/libros`}>Listado de libros</Link>
            <h1>{book.title}</h1>
            <p><Link href={`/libros/${book.id}/editar`}>
                Editar
            </Link></p>

        </div>
    )

}

export default BookDetail