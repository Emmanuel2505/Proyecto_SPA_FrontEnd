export default function Map() {
  return (
    <div className="flex justify-center my-8 align-center max-w-[1520px] min-w-[320px]">
      <div className="flex flex-row  h-[75vh] w-[80%] ">
        <div className="h-[100%] w-[50%]">
          <iframe
            title="hi"
            className="h-[100%] w-[100%] border-0"
            src="https://www.google.com/maps/embed?pb=!4v1652738669644!6m8!1m7!1s3zH3dhkd6MEr03Aw5hwaOA!2m2!1d-3.990930082019558!2d-79.20582015162954!3f98.12!4f-1.9899999999999949!5f0.7820865974627469"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="h-[100%] w-[50%]">
          <iframe
            title="hello"
            className="h-[100%] w-[100%] border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995.0358343302325!2d-79.20636871196831!3d-3.990928761964721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6d8e390bed1ad366!2zM8KwNTknMjcuNCJTIDc5wrAxMicyMS4wIlc!5e0!3m2!1ses!2sec!4v1652739028546!5m2!1ses!2sec"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
