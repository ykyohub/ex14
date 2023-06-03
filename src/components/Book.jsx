import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Card} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import {app} from '../firebaseInit'
import { getDatabase, ref, set } from 'firebase/database';
import moment from 'moment';

const Book = ({book, history}) => {
    const db = getDatabase(app);
    const [show, setShow] = useState(false);
    const uid = sessionStorage.getItem('uid');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onCart = (book) => {
        if(uid){
            if(window.confirm(book.title + ' 장바구니에 등록하실래요?')){
                //장바구니등록
                const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

                set(ref(db, `cart/${uid}/${book.isbn}`),
                    {...book, date:date});
                alert('장바구니등록성공!');
                handleClose();
            }
        }
        else{
            sessionStorage.setItem('target', '/book');
            history.push('/login');
        }
    }

    return (
        <>
            <Button variant="primary btn-sm" onClick={handleShow}>
                보기
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{book.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body className="book">
                            <img src={book.thumbnail}/>
                            <div>가격: {book.price}</div>
                            <div>저자: {book.authors}</div>
                            <hr/>
                            <div>{book.contents}</div>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        onClick={()=>onCart(book)}
                        variant='success'>장바구니</Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default withRouter(Book)