import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useLinks = defineStore("links", {
  state: () => ({
    links: [],
    loading: true,
    pagination: {
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 6,
      rowsNumber: 5,
    },
    filter: "",
    orderBy: "desc",
    typeLinkList: "active",
  }),
  // getters: {
  //   getLinks: async (state) => {
  //     return async (perPage, page) => this.getAllLinks();
  //   },
  // },
  actions: {
    async setPagination(pagination = null, filter = null) {
      if (pagination !== null) {
        this.pagination = pagination;
        this.orderBy = pagination.descending ? "desc" : "asc";
      }
      if (filter !== null) this.filter = filter;
      await this.getAllLinks();
    },
    async getAllLinks() {
      this.loading = true;
      let query = `?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}&orderBy=${this.orderBy}`;
      if (this.filter !== "") query = query + `&filter=${this.filter}`;

      let endpoint =
        this.typeLinkList === "active"
          ? `/links${query}`
          : `/links/disabled${query}`;
      const res = await api
        .get(endpoint)
        .then((res) => res.data)
        .catch((error) => error);

      console.log(res);
      if (res.success) {
        this.links = res.shortcuts.data;
        this.pagination["page"] = res.shortcuts.current_page;
        this.pagination["rowsPerPage"] = res.shortcuts.per_page;
        this.pagination["rowsNumber"] = res.shortcuts.total;
      } else {
        console.log(res);
        //implementar notify ?
      }

      this.loading = false;
    },
    async reactivateLink(id) {
      this.loading = true;
      const res = await api
        .put("/links/reactivate/" + id)
        .then((res) => res.data)
        .catch((error) => error);
      console.log(res);
      if (res.success) {
        await this.getAllLinks();
        this.loading = false;
      }
    },
    async disableLink(id) {
      this.loading = true;
      const res = await api
        .delete("/links/disable/" + id)
        .then((res) => res.data)
        .catch((error) => error);
      if (res.success) {
        await this.getAllLinks();
        this.loading = false;
      }
    },
    async createLink(url) {
      const res = await api
        .post("/links", { url })
        .then((res) => res.data)
        .catch((error) => error);
      console.log(res);
      if (res.success) {
        await this.getAllLinks();
        return { slug: res.data.slug, success: true };
      } else {
        if (res.error) {
          // implementar erro ?
        } else {
          return {
            success: false,
            message: res.message,
          };
        }
      }
    },
    async getLinkBySlug(slug) {
      const res = await api
        .get("/links/slug/" + slug)
        .then((res) => res.data)
        .catch((error) => error);

      return res;
    },
  },
});
