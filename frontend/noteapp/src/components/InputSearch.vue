

<script>
export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(error) {
            this.$emit("update:modelValue", error.target.value);
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>
