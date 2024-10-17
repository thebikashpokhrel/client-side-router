import Users from "../templates/Users.hbs";

const getUsers = async () => {
  const url = `https://api.freeapi.app/api/v1/public/randomusers?page=${Math.floor(
    Math.random() * 10
  )}&limit=2`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return {
      users: json.data.data,
    };
  } catch (error) {
    console.error(error);
  }
};

export const UsersRoute = {
  path: "/users",
  title: "Random Users",
  loader: getUsers,
  content: Users,
  callback: ({ parent, router }) => {
    const btns = parent.querySelectorAll(".userDetail");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        router.reload(true);
      });
    });
  },
  config: {
    template: true,
    content_cache: true,
    loader_cache: true,
    tag: "users",
  },
};
