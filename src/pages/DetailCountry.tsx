import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetailCountry } from "../api/api";

export default function DetailCountry() {
  const { id }: any = useParams();

  const { data, isLoading, isError, isFetching } = useQuery("country", () =>
    getDetailCountry(id)
  );

  console.log(data);
  function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="container p-10 mx-auto bg-slate-500/20 text-sky-500/80">
      {data && (
        <div className="flex">
          <div className="w-1/4">
            <img src={data.flags.png} alt={data.flags.alt} />
          </div>
          <div className="w-3/4 flex flex-col px-10  font-semibold gap-y-2">
            <p className="text-3xl">Nama Official : {data.name.official}</p>
            <p className="text-2xl">Singkatan : {data.cca3}</p>
            <p className="text-2xl">
              Populasi : {numberWithCommas(data.population)}
            </p>

            <p className="text-2xl">Wilayah : {data.region}</p>
            <p className="text-2xl">SubWilayah : {data.subregion}</p>
            <p className="text-2xl flex flex-col gap-y-2">
              Zona Waktu :{" "}
              {data.timezones.map((e: any) => (
                <span className="ml-5">{e}</span>
              ))}
            </p>
            <p className="text-2xl flex flex-col gap-y-2">Maps</p>
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  width="770"
                  height="510"
                  id="gmap_canvas"
                  src={`https://maps.google.com/maps?q=${data.capital[0]}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                  frameBorder="0"
                  scrolling="no"
                ></iframe>
                <a href="https://2yu.co" />
                <a href="https://embedgooglemap.2yu.co">
                  html embed google map
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
