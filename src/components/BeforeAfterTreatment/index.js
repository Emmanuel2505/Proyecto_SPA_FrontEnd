export default function BeforeAfterTreatment({ title, image }) {
  return (
    <div className="flex flex-col items-center max-w-[1520px] min-w-[320px]">
      <h1 className="text-2xl lg:text-4xl italic text-[#2D6BA2] mb-4">
        {title}
      </h1>
      <div className="flex flex-row items-center max-w-[1520px] min-w-[320px]">
        <div className="p-4 flex flex-col items-center max-w-[760px] min-w-[160px]">
          <img
            className="p-4 h-96 w-96 rounded-3xl border-2 border-solid border-[#8320F5]"
            src={image}
            alt={title}
          />
        </div>
        {/* <div className="p-4 flex flex-col items-center max-w-[760px] min-w-[160px]">
                    <h1 className="text-4xl italic pb-2">Antes</h1>
                    <img className="p-4 h-96 w-96 rounded-3xl border-2 border-solid border-[#8320F5]" src={imgBeautyTreatmentsBefore} alt="Tratamiento de Belleza Antes"/>
                    
                </div>
                <div className="p-4 flex flex-col items-center max-w-[760px] min-w-[160px]">
                    <h1 className="text-4xl italic pb-2">Después</h1>
                    <img className="p-4 h-96 w-96 rounded-3xl border-2 border-solid border-[#8320F5]" src={imgBeautyTreatmentsAfter} alt="Tratamiento de Belleza Después"/>
                </div> */}
      </div>
    </div>
  );
}
