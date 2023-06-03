import React, { useState } from 'react'
import {Row, Col, Button, Form} from 'react-bootstrap'
import moment from 'moment';
import { app } from '../../firebaseInit';
import {getFirestore, addDoc, collection} from 'firebase/firestore'
import { async } from '@firebase/util';

const PostWrite = ({history}) => {
    const db = getFirestore(app);
    const [form, setForm] = useState({
        email:sessionStorage.getItem('email'),
        title:'리액트',
        body:'프론트페이지를 작성하는 언어입니다.',
        date:''
    });
    const {email, title, body, date} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        if(title==='' || body==='') {
            alert('제목 또는 내용을 입력하세요!');
        }else{
            if(window.confirm('저장하실래요?')){
                setForm({
                    ...form,
                })
                await addDoc(collection(db, 'posts'), {
                    ...form,
                    date:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                });
                history.push('/posts');
            }
        }
    }
    return (
        <Row className='my-5'>
            <Col>
                <h1 className='text-center mb-5'>글쓰기</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Control name="title" value={title}
                        onChange={onChange}
                        className='my-2'
                        placeholder='제목을 입력하세요.'/>
                    <Form.Control name="body" value={body}
                        onChange={onChange}
                        placeholder='내용을 입력하세요.'
                        className='my-5' 
                        as="textarea" rows={10}/>
                    <div>
                        <Button type="submit"
                            className='mx-2'>글저장</Button>
                        <Button type="reset"
                            className='mx-2'
                            variant='secondary'>취소</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default PostWrite