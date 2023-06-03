import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getDatabase, ref, onValue, remove, get } from 'firebase/database'
import MapPage from './MapPage'

const FavoritePage = () => {
    const db = getDatabase(app);
    const uid = sessionStorage.getItem('uid');
    const [locals, setLocals] = useState([]);
    const [loading, setLoading] = useState(false);
    const onRemove = (id) => {
        if(window.confirm(id + '번 즐겨찾기를 삭제하실래요?')){
            remove(ref(db, `favorite/${uid}/${id}`));
            
        }
    }

    const getLocals = () => {
        setLoading(true);
        onValue(ref(db, `favorite/${uid}`), (snapshot)=>{
            let rows=[];
            snapshot.forEach(row=>{
                rows.push({key: row.key, ...row.val()})
            });
            //console.log(rows);
            setLocals(rows);
            setLoading(false);
        });
    }
    useEffect(()=>{
        getLocals();
    }, []);
    
    if(loading) return <h1>...로딩중</h1>
    return (
        <Row className='my-5'>
            <Col>
                <h1 className='text-center mb-5'>즐겨찾기</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>장소명</td>
                            <td>주소</td>
                            <td>전화</td>
                            <td>위치</td>
                            <td>삭제</td>
                        </tr>
                    </thead>
                    <tbody>
                        {locals.map(local=>
                            <tr key={local.key}>
                                <td>{local.place_name}</td>
                                <td>{local.address_name}</td>
                                <td>{local.phone}<br/>
                                    {local.date}</td>
                                <td><MapPage local={local}/></td>
                                <td><Button onClick={()=>onRemove(local.id)} 
                                        className='btn-sm' variant='danger'>삭제</Button></td>
                            </tr>)}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default FavoritePage