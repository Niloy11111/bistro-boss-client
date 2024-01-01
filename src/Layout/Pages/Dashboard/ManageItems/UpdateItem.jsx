import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const image_hostig_key = import.meta.env.VITE_IMAGE_HOSTING_KEY ;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hostig_key}` ;

const UpdateItem = () => {
    const {name, category, recipe, price, _id} = useLoaderData() ;
    const { register, handleSubmit } = useForm() ;
    const axiosPublic = useAxiosPublic() ;
    const axiosSecure = UseAxiosSecure() ;

    const onSubmit = async (data) => {
        console.log(data)
        //image upload to imgbb and then get an ulr .
        const imageFile = {image : data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers : {
            'content-type' : 'multipart/form-data'
          }
        } )
        if(res.data.success){
          const menuItem = {
            name : data.name ,
            price : parseFloat(data.price) ,
            category : data.category ,
            recipe : data.recipe ,
            image : res.data.data.display_url 
          }
          // now 
          const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem) ;
          console.log(menuRes.data)
          if(menuRes.data.modifiedCount > 0){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${data.name} is updated`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
    }

   
 
    return (
        <div>
            <SectionTitle heading="update" subHeading="hurry up"></SectionTitle>

               
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>

      <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text">Recipe name?</span>
  </label>
  <input {...register('name', {required : true})}
   required
   defaultValue={name}
   type="text" placeholder="Type here" className="input input-bordered w-full " />
</div>


    <div className="flex gap-5">
        {/* category  */}
        
      <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text">Category </span>
  </label>
  
  <select defaultValue={category} {... register('category' , {required : true})} className="select select-primary w-full ">

<option disabled value="default">Select a category </option>
<option value="Salad">Salad</option>
<option value="Pizza">Pizza </option>
<option value="Soup">Soup </option>
<option value="Dessert">Dessert </option>
<option value="Drinks">Drinks </option>
</select>
</div>
        {/* price */}
        <div className="form-control w-full my-6">
  <label className="label">
    <span className="label-text">Price</span>
  </label>
  <input {...register('price' , {required : true})}
   type="text" placeholder="Price" defaultValue={price} className="input input-bordered w-full " />
</div>


    </div>

    <textarea {...register('recipe')} defaultValue={recipe} placeholder="Bio" className="textarea textarea-bordered textarea-lg w-full" ></textarea>

    <div>
    <input {...register('image' , {required : true})} type="file" className="file-input file-input-bordered file-input-warning w-full max-w-xs" />
    </div>

     <button className="btn">

        Update menu Item 
     </button>
    </form>
        </div>
        </div>
    );
};

export default UpdateItem;