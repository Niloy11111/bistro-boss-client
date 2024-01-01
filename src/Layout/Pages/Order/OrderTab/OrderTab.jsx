import FoodCard from "../../../../Components/SectionTitle/FoodCard/FoodCard";

const OrderTab = ({items}) => {

   
    return (
        
        <div className='grid grid-cols-3'>
        {
            items.map(item => <FoodCard
            item={item}
            key={item._id}
            ></FoodCard>)
        }
         </div>

    
   
    );
};

export default OrderTab;