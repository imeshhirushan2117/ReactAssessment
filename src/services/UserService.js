import axios from "../axios";

class UserService {

    addProduct = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('products',data).then((res)=>{
                return resolve(res)
            }).catch((err)=>{
                return resolve(err)
            })
        })
        return await promise;
    }

    fetchUsers=async ()=>{
        const promise = new Promise((resolve, reject) => {
            axios.get('users').then((res)=>{
                return resolve(res)
            }).catch((err)=>{
                return resolve(err)
            })
        })
        return await promise;
    }
}
export default new UserService();