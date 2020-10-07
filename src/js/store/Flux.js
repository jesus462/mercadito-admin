import firebase from "../utils/firebase";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			cloudinary: { userName: "dqjibjhkx" },
			loadingItems: true,
			items: [],
			signedIn: false
		},
		actions: {
			fetchItems: async () => {
				const db = firebase.firestore();
				let data = await db.collection("items").get();
				setStore({
					items: data.docs.map(doc => ({ ...doc.data(), id: doc.id })),
					loadingItems: false
				});
			},
			setLoadingItems: value => {
				setStore({ loadingItems: !value });
			},
			setSignedIn: value => {
				setStore({ signedIn: !value });
			}
		}
	};
};

export default getState;
