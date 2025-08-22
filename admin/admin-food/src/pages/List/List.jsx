import { useState, useEffect } from "react"; // Sửa lỗi 1
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'; // Thêm để sửa lỗi 2

const List = ({ url }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error fetching list");
        }
    };

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList(); // Lấy lại danh sách sau khi xóa
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error removing food");
        }
    };

    useEffect(() => {
        fetchList();
    }, );

    return (
        <div className='list-add flex-col'>
            <p>All Food List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item) => (
                    <div key={item._id} className="list-table-format">
                        <img src={`${url}/images/` + item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p onClick={() => removeFood(item._id)} className="cursor">X</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Thêm đoạn này để sửa lỗi 2
List.propTypes = {
    url: PropTypes.string.isRequired
};

export default List;