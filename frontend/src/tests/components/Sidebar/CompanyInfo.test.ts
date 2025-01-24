import { describe, it, expect } from "vitest";
import CompanyInfo from "../../../components/UI/Sidebar/CompanyInfo.vue";
import { mount } from "@vue/test-utils";

describe("CompanyInfo", () => {
  it("should render the company info", () => {
    const wrapper = mount(CompanyInfo);
    expect(wrapper.text()).toContain("SalesBerichte GmbH");
  });
});
