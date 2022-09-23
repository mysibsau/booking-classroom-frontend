import React from "react";
import "./Pagination.scss";
import classnames from "classnames";
import { usePagination } from "./usePagination";
import { IconArrowLeft, IconArrowRight } from "../Icons";


interface IProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    count: number;
    perPage?: number;
}

const Pagination: React.FC<IProps> = ({ perPage = 6, setPage, page, count }) => {
    const pageList = usePagination(page, perPage, count);

    const maxPage = pageList ? pageList[pageList.length - 1] : parseInt((count / perPage).toFixed(0));

    const changePage = (selectedPage: number | string) => {
        switch (selectedPage) {
            case "next":
                page < maxPage && setPage(page + 1);
                break;
            case "previous":
                page > 1 && setPage(page - 1);
                break;
            case "...":
                break;
            default:
                setPage(parseInt(selectedPage.toString()));
        }
    };

    return (
        <div className={"Pagination"}>
            <div>
                <span className={"arrows"} onClick={() => changePage("previous")}>
                    <IconArrowLeft color={"default"} size={25} />
                </span>
                <div className={"pageNums"}>
                    {pageList && pageList.map((pageNum, index) =>
                        <span
                            className={classnames({
                                "number": pageNum !== "...",
                                "current": pageNum === page
                            })}
                            onClick={() => changePage(pageNum)}
                            key={index}>{pageNum}</span>
                    )}
                </div>
                <span className={"arrows"} onClick={() => changePage("next")}>
                    <IconArrowRight color={"default"} size={25} />
                </span>
            </div>
        </div>
    );
};

export default Pagination;