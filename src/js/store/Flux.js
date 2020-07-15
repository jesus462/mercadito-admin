const getState = ({ getStore, getActions, setStore }) => {
	const APIurl = "https://3000-b0d370a1-2329-43ed-96dc-d2066a5cc2a7.ws-us02.gitpod.io/items";

	return {
		store: {
			cloudinary: { userName: "dqjibjhkx" },
			data: []
		},
		actions: {
			fetchCreateClient: async item => {
				let actions = getActions();
				let itemWasCreated = false;

				try {
					let response = await fetch(APIurl, {
						method: "POST",
						headers: {
							"Content-Type": "application/JSON"
						},
						body: JSON.stringify(item)
					});

					if (response.ok) {
						await actions.fetchUserClients();
						itemWasCreated = true;
					}
				} catch (error) {
					console.log(error);
				}

				return itemWasCreated;
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
