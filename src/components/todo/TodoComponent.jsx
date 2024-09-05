import {useNavigate, useParams} from "react-router-dom";
import {createTodoApi, retrieveTodoApi, updateTodoApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useEffect, useState} from "react";
import {Form, Formik, Field, ErrorMessage} from "formik";
import moment from "moment";


export function TodoComponent() {

    const {id} = useParams();
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const authContext = useAuth();
    const username = authContext.username
    const navigate = useNavigate();

    useEffect(() => retrieveTodo(), [id]);

    function retrieveTodo() {
        if(id === '-1') return
        retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
    }

    function onSubmit(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        console.log(todo)

        if (id === '-1') {
            createTodoApi(username, todo)
                .then(response => {
                    console.log(response)
                })
                .catch(error => console.log(error))
            navigate(`/todos`)
            return
        }

        updateTodoApi(username, id, todo)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
        navigate(`/todos`)
    }

    function validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        }

        if (!values.targetDate || values.targetDate === '' || !moment(values.targetDate)) {
            errors.targetDate = 'Enter a Target Date'
        }

        return errors
    }

    return (
        <div className={"container"}>
            <h1>Todo Component</h1>
            <div>
                <Formik initialValues={{targetDate,description}}
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                        validate={validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                >
                    {(props) => (
                        <Form>
                            <ErrorMessage
                                name={"description"}
                                component={"div"}
                                className={"alert alert-warning"}

                            />
                            <ErrorMessage
                                name={"targetDate"}
                                component={"div"}
                                className={"alert alert-warning"}

                            />

                            <fieldset className={"form-group"}>
                                <label>Description</label>
                                <Field className={"form-control"} type={"text"} name={"description"}/>
                            </fieldset>

                            <fieldset className={"form-group"}>
                                <label>Target Date</label>
                                <Field className={"form-control"} type={"date"} name={"targetDate"}/>
                            </fieldset>

                            <button className={"btn btn-success"} type={"submit"}>Save</button>
                        </Form>
                    )
                    }
                </Formik>
            </div>
        </div>
    );
}