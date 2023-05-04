<template>
	<div
		class="topic col-md-3"
		@click="
			(event) => {
				event.stopPropagation();
				edit = true;
			}
		"
	>
		<div v-if="edit" @click="(event) => event.stopPropagation()">
			<input placeholder="Topic" v-model="formData.topic" />

			<quill-editor
				theme="bubble"
				v-model:content="formData.content"
				content-type="html"
			></quill-editor>
		</div>

		<div v-else style="flex: 1">
			<h5>{{ note.topic }}</h5>
			<div v-html="note.content"></div>
		</div>
		
		<div @click="handleDelete" class="btn btn-danger">
			<font-awesome-icon :icon="['fas', 'trash']" />
		</div>
		<p class="timer">{{ dateTime(note.createdAt) }}</p>
	</div>
</template>

<script>
import moment from "moment"
export default {
	props: ["note"],
	emits: ["delete:note", "update:note"],
	data() {
		return { edit: false, formData: this.note };
	},
	methods: {
		handleDelete() {
			this.$emit("delete:note", this.note._id);
		},
		toggleEdit() {
			if (!this.edit) return;

			this.$emit("update:note", this.formData);
			this.edit = !this.edit;
		},
		dateTime(value){
			return moment(value).format('MMMM Do YYYY, h:mm:ss a');
		}
	},
	mounted() {
		window.addEventListener("click", this.toggleEdit);
	},
	unmounted() {
		window.removeEventListener("click", this.toggleEdit);
	},
};
</script>

<style scoped>

.timer{
	color: gray;
	font-size: smaller;
}
.btn-danger {
	background-color: #ff0000;
	color: #fff;
	box-shadow: 0 0 5px #00000020;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	padding: 5px;
	margin: 5px;
	margin-top: auto;
	width: 40px;

	justify-content: center;
	align-items: center;
}

.btn-danger:hover {
	background-color: #fff;
	color: #ff0000;
	box-shadow: 0 0 5px #ff0000;
}

.topic {
	box-shadow: 0 0 5px #00000020;
	border-radius: 10px;
	background: #fff;
	margin: 10px;
	cursor: pointer;
	text-align: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 20px;
}

.topic p {
	word-break: break-all;
}

.topic:hover {
	box-shadow: 0 0 5px violet;
	transform: translateY(2px);
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1),
		0 1px 2px rgba(0, 0, 0, 0.05) violet;
}

input {
	width: 100%;
	outline: none;
	border: none;
}
</style>
