import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../../../assets/home/featured.jpg"

const Featured = () => {
    return (
        <div style={{
            backgroundImage : `url(${featuredImg})` ,
            backgroundSize : 'cover',
        }} className="pt-8 text-white bg-fixed ">
            <SectionTitle subHeading='check it out'
            heading='Featured Item'
            ></SectionTitle>

            <div className="flex justify-center items-center py-20 px-36 gap-12 bg-slate-500 bg-opacity-40">

                <div >
                    <img src={featuredImg}></img>
                </div>

                <div>
                    <p >Aug 20, 2023</p>
                    <p className="uppercase ">
WHERE CAN I GET SOME?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                    </p>
                    <button className="btn text-[white] btn-outline border-b-4">Order</button>
                    
                </div>


            </div>

        </div>
    );
};

export default Featured;