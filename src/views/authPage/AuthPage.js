import React, { Component } from 'react';
import Form from 'react-formal';
import yup from 'yup';
import styles from './style.css';

class AuthPage extends Component {
    constructor () {
        super();

        this.schema = yup.object({
            name: yup.string()
                .required(`Пожалуйста, укажите Ваше имя`),
        });
    }

    render () {
        return (
            <div className={styles.form_group}>
                <span>Имя</span>

            <Form className={styles.form}
                  schema={this.schema}
            >
                <div>
                    <Form.Field name='name'/>
                    <Form.Message for='name'/>
                </div>

                <div className={styles.input_group}>
                    <label>
                        <input
                               type="checkbox"
                               value=""
                               onChange=""
                        /> Ведущий
                    </label>

                    <label>
                        <input
                               type="checkbox"
                               value=""
                               onChange=""
                        /> Запомнить
                    </label>
                </div>

                <Form.Button type="submit" className={styles.btn}>
                    Войти
                </Form.Button>
            </Form>
            </div>
        );
    }
}

export default AuthPage;