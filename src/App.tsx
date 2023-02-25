import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCountries, searchCountry } from "./api/api";

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<any>("");
  const [dataSearch, setDataSearch] = useState([]);

  const { data, isLoading, isError, isFetching, isPreviousData } = useQuery(
    ["countries", page],
    () => getCountries(page, 10),
    {
      keepPreviousData: true,
      select: (data: any) =>
        data.sort((a: any, b: any) =>
          a.name.official.localeCompare(b.name.official)
        ),
    }
  );

  const searchCountries = async () => {
    if (search == "") {
      setDataSearch([]);
    } else {
      const data: any = await searchCountry(search);
      setDataSearch(data);
      console.log(data);
    }
  };

  const handleLoadMore = () => {
    setPage((old) => old + 1);
  };

  const handleLoadLess = () => {
    setPage((old) => old - 1);
  };

  useEffect(() => {
    searchCountries();
  }, [search]);

  return (
    <div className="bg-slate-100/50">
      <div className="flex h-20 items-center justify-center gap-x-20">
        <button onClick={handleLoadLess} disabled={page === 1}>
          Previous Page
        </button>{" "}
        <div className="flex gap-x-4 items-center">
          <span>{page === 1 ? null : page - 1}</span>
          <span className="bg-slate-500/50 px-2 py-1 text-white rounded-md">
            {page}
          </span>
          <span>{page + 1}</span>
        </div>
        <button
          onClick={handleLoadMore}
          // Disable the Next Page button until we know a next page is available
          disabled={page === 20}
        >
          Next Page
        </button>
      </div>
      <form className="flex justify-center gap-x-5 mb-5 relative">
        <input
          type="text"
          className="p-2 border-[1px] border-slate-500/50 w-1/3 rounded-md"
          placeholder={`Typing "Indonesia"`}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              searchCountries();
            }
          }}
        />
        <div
          className={`
           ${search == "" ? "hidden" : ""}
               absolute h-80 w-80 -translate-x-1/2 translate-y-0 rounded-md  left-1/2 top-10 bg-slate-500 text-white p-5 overflow-y-scroll flex flex-col gap-2
              `}
        >
          {dataSearch === undefined && <p>Not Found</p>}

          {dataSearch
            ? dataSearch.map((country: any) => (
                <div key={country.capital[0]} className="">
                  {/* <p className="card-text"> {country.altSpellings[1]}</p> */}
                  <Link
                    to={"/" + country.name.official}
                    className="border-[1px] rounded-md py-1 bg-blue-500/50 text-white p-2 text-center block"
                  >
                    <p>{country.altSpellings[1]}</p>
                  </Link>
                </div>
              ))
            : null}
        </div>
      </form>
      <div className="flex flex-wrap items-center container mx-auto">
        {isFetching && <div className="text-center mt-10">Loading more...</div>}
        {!isFetching &&
          data?.map((country: any) => (
            <div className="w-1/3 my-4 " key={country.name.official}>
              <div className="w-[95%] mx-auto border-2 rounded-lg p-5 bg-white min-h-[200px]">
                <div className="flex flex-col gap-y-3">
                  <img
                    src={country.flags.svg}
                    alt="flag"
                    className="w-24 h-fit object-contain"
                  />
                  <h2>{country.name.official}</h2>
                  <p className="card-text">Capital: {country.capital}</p>
                  <p className="card-text">Population: {country.population}</p>
                  <Link
                    to={"/" + country.name.official}
                    className="border-[1px] rounded-md py-1 bg-blue-500/50 text-white p-2 text-center"
                  >
                    <button>Detail</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
