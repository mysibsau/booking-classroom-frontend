import React, { useEffect, useState } from 'react'
import { Button, Input, Select } from '../../../components/UI';
import Pagination from '../../../components/UI/Pagination';
import { useClassroomStore } from '../../../stores';
import ClassroomItem from './ClassroomItem';
import "./ClassroomList.scss";


const ClassroomList = () => {
    const { getClassroomList, classroomList, count } = useClassroomStore(state => state)
    const [address, setAddress] = useState("")
    const [page, setPage] = useState(1)

    const background = require("../../../assets/background.png")

    useEffect(() => {
        getClassroomListHandler()
    }, [page])

    const getClassroomListHandler = () => {
        const params = {
            page,
            page_size: 6,
            search: address
        }
        getClassroomList(params)
    }

    return (
        <section className={"classroomList"} style={{ backgroundImage: `url(${background})` }}>
            <div className={"blur"}></div>
            <div className={"classroomList-container"}>
                <h2>Наши аудитории</h2>
                <div className={"filters"}>
                    <div className={"filters-container"}>
                        <div className={"filters-left"}>
                            <Input value={address} onChange={setAddress} type={"text"} placeholder={"Введите название аудитории"} />
                        </div>
                        <div className={"filters-right"}>
                            <Button variant={"primary"} onClick={getClassroomListHandler}>Найти</Button>
                        </div>
                    </div>
                </div>
                <div className={"classroom-list"}>
                    {classroomList && classroomList.length
                        ? classroomList.map(item =>
                            <ClassroomItem classroom={item} key={item.id} />
                        )
                        : <></>
                    }
                </div>
            </div>
            {count > 6
                ?
                <div className={"pagination-container"}>
                    <Pagination count={count} page={page} setPage={setPage} perPage={6} />
                </div>
                : <></>
            }
        </section>
    )
}

export default ClassroomList