import httpService from "./http.service";

const qualitiesEndPoint = "quality/";

const qualitiesService = {
    get: async function () {
        const { data } = await httpService.get(qualitiesEndPoint);

        return data;
    }
};

export default qualitiesService;
