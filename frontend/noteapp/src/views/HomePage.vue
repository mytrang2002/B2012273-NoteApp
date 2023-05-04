<template>
	<header>
		<div class="logout">
		<button class="but-logout" @click="$store.dispatch('logout')">Log out</button>
	</div>
		<div class="input-group mb-3">
			<input
			type="text"
			class="form-control"
			placeholder="Search..."
			@input="updateModelValue"
			@keyup.enter="submit"
			aria-label="Recipient's username"
			aria-describedby="button-addon2"
			v-model="searchText"
			/>
			
			<button
			class="btn btn-outline-secondary"
			type="button"
			@click="submit"
			id="button-addon2"
			>
			<font-awesome-icon :icon="['fas', 'magnifying-glass']" />
		</button>
	</div>
</header>
<main>
		<input-note @update:created="getAllNotes"></input-note>
		<div class="row">
			<div class="col col-9 row" ref="parent">
				<note-component
					v-for="note in searchedNotes"
					:key="note._id"
					:note="note"
					@delete:note="deleteNote"
					@update:note="(payload) => updateNote(note._id, payload)"
				></note-component>
			</div>

			<div class="col col-3">
				<h2>Daily Diary</h2>
				<p>
					This is the place to store your memories and love. Smile
					anytime, anywhere and every day. 
				</p>
				<p>Sometime, there is no next
					time. No second chance, no time out. Sometime it is, now or
					never, things change, friends leave. And life doesn't change
					for anybody.</p>
				<div class="input-group mb-3">
					<button
						class="but-deleteAll"
						@click="deleteNoteAll(note)"
					>
						Delete All
					</button>
				</div>
			</div>
		</div>
	</main>
</template>
<script setup>
import InputNote from "@/components/InputNote.vue";
import NoteService from "../services/note.service";
import { onMounted, ref } from "vue";
import autoAnimate from "@formkit/auto-animate";
import NoteComponent from "../components/NoteComponent.vue";

const parent = ref();

onMounted(() => {
	autoAnimate(parent.value);
});
</script>

<script>

export default {
	data() {
		return {
			notes: [],
			parent,
			message: "",
			activeIndex: -1,
			searchText: "",
		};
	},

	watch: {
		searchText() {
			this.activeIndex = -1;
		},
	},
	computed: {

		noteStrings() {
			return this.notes.map((note) => {
				const { topic, content, color, date } = note;
				return [topic, content, color, date].join("");
			});
		},

		filteredNotes() {
			if (!this.searchText) return this.notes;
			return this.notes.filter((_note, index) =>
				this.noteStrings[index].includes(this.searchText)
			);
		},
		searchedNotes() {
			if (this.searchText.trim().length > 0) {
				return this.notes.filter((note) =>
					note.topic
						.toLowerCase()
						.includes(this.searchText.trim().toLowerCase())
				);
			}
			return this.notes;
		},
		activeNote() {
			if (this.activeIndex < 0) return null;
			return this.filteredNotes[this.activeIndex];
		},
		filteredNotesCount() {
			return this.filteredNotes.length;
		},

	},

	methods: {
		async getAllNotes() {
			const res = await NoteService.getAll();
			this.notes = res.reverse();
		},
		async deleteNote(id) {
			if (confirm("Do you want to delete this note?")) {
				try {
					await NoteService.delete(id);
				} catch (error) {
					console.log(error);
				} finally {
					this.getAllNotes();
				}
			}
		},
		async deleteNoteAll() {
			if (confirm("Do you want to delete all note?")) {
				try {
					await NoteService.delete("/");
				} catch (error) {
					console.log(error);
				} finally {
					this.getAllNotes();
				}
			}
		},
		async updateNote(id, payload) {
			try {
				await NoteService.update(id, payload);
				await this.getAllNotes();
			} catch (error) {
				console.log(error);
			}
		},

		async retrieveNotes() {
			try {
				this.notes = await NoteService.getAll();
			} catch (error) {
				console.log(error);
			}
		},
		refreshList() {
			this.retrieveNotes();
			this.activeIndex = -1;
		},
	},

	mounted() {
		this.getAllNotes();
		this.message = "";
	},

	
	
};
</script>
<style scoped>
.search-but {
	/* background-color: #ff0000; */
	color: black;
	box-shadow: 0 0 5px #00000020;
	border: none;
	border-radius: 5px;
	width: 30px;
}
.but-logout {
	background-color: #f83f3f;
	color: #fff;
	box-shadow: 0 0 5px #00000020;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	padding: 20px 5px;
	margin: 10px;
	top: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
	word-break: break-all;
	width: 100%;
}

.but-deleteAll {
	background-color: #ff0000e9;
	color: #fff;
	box-shadow: 0 0 5px #00000020;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	padding: 5px;
	margin: 10px;
	top: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
	word-break: break-all;
	width: 100%;
}

.but-logout:hover {
	background-color: #fff;
	color: #ff0000;
	box-shadow: 0 0 5px #ff0000;
}
.but-deleteAll:hover {
	background-color: #fff;
	color: #ff0000;
	box-shadow: 0 0 5px #ff0000;
}
</style>

<style>



.logout{
	float: right;
}
.logout button{
	border: none;
	background-color: #ff2b2b;
	color: #fff;
	width: 100px;
	height: 30px;
	margin-bottom: 10px;
	border-radius: 15px;
}
body {
	background-color: rgb(101, 177, 215);
	background-size: cover;
}

.input-group input {
	max-width: unset !important;
	margin-bottom: unset !important;
}
</style>
