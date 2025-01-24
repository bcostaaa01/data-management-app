import { describe, it, expect, beforeEach } from "vitest";
import UserInfo from "../../../components/UI/Sidebar/UserInfo.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "../../../stores/user.store";

const wrapper = mount(UserInfo, {
  global: {
    plugins: [createTestingPinia()],
  },
});

describe("UserInfo", () => {
  beforeEach(() => {
    const store = useUserStore();
    store.user = {
      user: {
        email: "test@test.com",
      },
    };
  });

  it("should render the loading state", () => {
    setTimeout(() => {
      expect(wrapper.text()).toContain("Loading...");
    }, 1000);
  });

  it("should render the user info", () => {
    expect(wrapper.text()).toContain("TE");
    expect(wrapper.text()).toContain("test@test.com");
  });
});
