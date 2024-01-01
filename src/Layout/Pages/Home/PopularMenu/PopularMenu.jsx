
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../../Shared/MenuItem/MenuItem";
import useMenu from "../../../../Hooks/useMenu";


const PopularMenu = () => {

    const [menu] = useMenu() ;

    const popular = menu.filter(item => item.category === 'popular' )

    return (
        <section className="mb-12">

         <SectionTitle 
         heading="From Our Menu"
         subHeading="Popular Items"
         >
            
         </SectionTitle>
         <div className="grid grid-cols-2 gap-6">
            {
                popular.map(item => <MenuItem
                key={item._id}
                item={item}
                ></MenuItem>)
            }
         </div>
         <button className="btn text-[white] btn-outline border-b-4">View Full Menu</button>
            
        </section>

     
    );
};

export default PopularMenu;