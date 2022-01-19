
import {useEffect} from 'react'
import React, {useState} from 'react'
import {AddUserForm} from '../forms/AddUserForms';
import {EditUserForm} from '../forms/EditUserForm';




const General = () => {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [contacts, setItems] = useState(JSON.parse(localStorage.getItem('contacts')) || []);
    
    const [editing, setEditing] = useState(false)

    const initialFormState = { id: null, name: '', phone: '' }
    const [currentUser, setCurrentUser] = useState(initialFormState)

    const handleDeleteUser = id => {
        let answer = window.confirm('Вы действительно хотите удалить?')

        if (answer) {
            deleteUser(id)
        }
    }

    const addUser = user => {
        user.id = contacts.length + 1
        setItems([ ...contacts, user ])
    }

    const deleteUser = (id) => {
        setItems(contacts.filter(user => user.id !== id))
    }

    const updateUser = (id, updatedUser) => {
        setEditing(false)
        setItems(contacts.map(user => (user.id === id ? updatedUser : user)))
    }

    const editRow = user => {
        setEditing(true)
        setCurrentUser({ id: user.id, name: user.name, phone: user.phone })
    }

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts])
    
    
    useEffect(() => {
        const contactsList = localStorage.getItem('contacts')
        if (contactsList && contacts.length > 0) {
            setIsLoaded(true)
            return
        }
        fetch("https://demo.sibers.com/users")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
            },
            // Note: it's important to handle errors here and not in the catch() block,
            // not to catch exceptions from errors in the components themselves.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    }, [])

    
    if (error) {
    return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
    return <div>Загрузка...</div>;
    } else {
    return (
        <div className="container">
            <h1>Телефонная Книга</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <div>
                            <h2>Редактировать контакт</h2>
                            <EditUserForm
                                editing={editing}
                                setEditing={setEditing}
                                currentUser={currentUser}
                                updateUser={updateUser}
                            />
                        </div>
                    ) : (
                        <div>
                            <h2>Добавить контакт</h2>
                            <AddUserForm addUser={addUser} />
                        </div>
                    )}
                </div>
                <div className="flex-large">
                    <h2>Мои контакты</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Номер</th>
                            
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contacts.length > 0 ? (
                            contacts.map( user =>(
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    
                                    <td>
                                        <button className="button muted-button" onClick={() => editRow(user)}>Редактировать</button>
                                        <button className="button muted-button-delete" onClick={() => handleDeleteUser(user.id)}>Удалить</button>
                                    </td>
                                </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan={3}>Список контактов пуст</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    
                    
                </div>
            </div>
        </div>
    )
        }



    
}

export {General}