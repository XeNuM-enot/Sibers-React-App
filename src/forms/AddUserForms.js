import React,{useState} from "react";

const AddUserForm = (props) => {

    const initialFormState = { id: null, name: '', phone: '' }

    const [user, setUser] = useState(initialFormState)

    const handleInputChange = e => {
        const { name, value } = e.currentTarget
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = e =>{
        e.preventDefault()
        if (!user.name || !user.phone)  return
        props.addUser(user)
        setUser(initialFormState)

    }

    return(
       <form onSubmit={handleSubmit}>
           <label>Имя</label>
           <input  type="text" name="name" value={user.name} onChange={handleInputChange} />
           <label>Номер</label>
           <input  type="text" name="phone" value={user.phone} onChange={handleInputChange} />
           <button>Добавить новый контакт</button>
       </form>
    )
}

export {AddUserForm}

