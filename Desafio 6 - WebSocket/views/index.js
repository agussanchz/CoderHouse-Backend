const socket = io.connect();

const date = new Date()

//Funcion para renderizar el chat
const renderChat = (data) => {
    const html = data.map((elem) => {
        return ( 
            `<div>
                <strong>${elem.email} [${date.toLocaleString()}]: </strong>
                <em>${elem.mensaje}</em>
            </div>`
        )
    }).join(" ");
    document.getElementById("messages").innerHTML = html;
}   

socket.on("messages", (data) => {
    {renderChat(data)};
})

//Funcion para mandar mensaje
const addMessage = (e) =>{
    const mensaje = {
        email: document.getElementById("email").value,
        mensaje: document.getElementById("mensaje").value,
    };

    socket.emit("new-message", mensaje)
    return false
}


//Funcion para renderizar los productos recibidos
const render = (data) => {
    const html = data.map((prod) => {
        return ( 
            `<table bgcolor="blue" width="500">
                <tr bgcolor="grey">
                    <th>Title</th>
                    <th>Price</th>
                    <th>Url</th>
                </tr>
                <tr bgcolor="lightgrey" align="center">
                    <td>${prod.title}</td>
                    <td>${prod.price}</td>
                    <td>${prod.thumbnail}</td>
                </tr>
            </table>`
        )
    })
    document.getElementById("products").innerHTML = html;
}   

socket.on("products", (data) => {
    {render(data)};
})

//Funcion para agregar productos
const addProducts = async (e) =>{
    const products = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    
    socket.emit("new-products", products)
    return false
}
