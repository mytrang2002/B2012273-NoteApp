<template>
	<div class="wrapper" @click="(event) => event.stopPropagation()">
		<div v-if="opened">
			<input
				type="text"
				placeholder="Topic"
				class="title"
				autofocus
				v-model="noteData.topic"
			/>

			<quill-editor
				theme="bubble"
				placeholder="Content..."
				v-model:content="noteData.content"
				contentType="html"
			></quill-editor>
		</div>
		<div v-else class="placeholder" @click="openEdit">
			<font-awesome-icon :icon="['fas', 'folder-plus']" /> Create New Note
		</div>
	</div>
</template>

<script>
import NoteService from "../services/note.service";

export default {
	emits: ["update:created"],
	data() {
		return { opened: false, noteData: { topic: "", content: "" } };
	},
	methods: {
		closeEdit() {
			if (!this.opened) return;
			this.opened = false;
			NoteService.create(this.noteData).finally(() => {
				this.noteData.topic = "";
				this.noteData.content = "";
				this.$emit("update:created");
			});
		},
		openEdit() {
			this.opened = true;
		},
	},
	mounted() {
		window.addEventListener("click", this.closeEdit);
	},
	unmounted() {
		window.removeEventListener("click", this.closeEdit);
	},
};
</script>

<style scoped>
.wrapper {
	width: 500px;
	max-width: 100%;
	border-radius: 5px;
	border: 1px solid #ddd;
	background: #fff;
}

.placeholder {
	padding: 10px 20px;
	user-select: none;
	cursor: text;
	width: 100%;
	background: none;
	border-radius: 5px;
}
.title {
	padding: 10px 20px;
	width: 100%;
	outline: none;
	display: block;
	border: none;
	border-radius: 5px;
}
</style>
