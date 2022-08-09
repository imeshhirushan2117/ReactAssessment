import axios from "../axios";

class ProductService {

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

    fetchCategory=async ()=>{
        const promise = new Promise((resolve, reject) => {
            axios.get('products/categories').then((res)=>{
                return resolve(res)
            }).catch((err)=>{
                return resolve(err)
            })
        })
        return await promise;
    }
}
export default new ProductService();