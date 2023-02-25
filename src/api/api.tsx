import _ from "lodash";

export const getCountries = async (page: number, perPage: number) => {
  try {
    const data = await fetch("https://restcountries.com/v3.1/all").then((res) =>
      res.json()
    );

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const sample = data.slice(startIndex, endIndex);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return sample;
  } catch (error) {
    console.log(error);
  }
};

export const searchCountry = async (search: string) => {
  try {
    const data = await fetch(
      "https://restcountries.com/v3.1/name/" + search
    ).then((res) => res.json());

    const sample = data.slice(0, 10);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return sample;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailCountry = async (detail: string) => {
  try {
    const data = await fetch(
      "https://restcountries.com/v3.1/name/" + detail
    ).then((res) => res.json());

    await new Promise((resolve) => setTimeout(resolve, 500));

    return data[0];
  } catch (error) {
    console.log(error);
  }
};
