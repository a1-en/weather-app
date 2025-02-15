<template>
  <div class="profile-edit">
    <div class="edit-container">
      <h2>Edit Profile</h2>
      <div class="avatar-container" @click="toggleEdit">
        <img class="avatar" src="/avatar.png" alt="User Avatar" />
        <div v-if="isEditing" class="edit-icon">✏️</div>
      </div>
      <h3 style="color: black">{{ name }}</h3>
      <p class="user-info">{{ email }} | {{ phone }}</p>

      <div class="input-group">
        <label>Full Name</label>
        <input type="text" v-model="name" :disabled="!isEditing" :class="{'edit-mode': isEditing}" />
      </div>
      <div class="input-group">
        <label>Email</label>
        <input type="email" v-model="email" :disabled="!isEditing" :class="{'edit-mode': isEditing}" />
      </div>
      <div class="input-group">
        <label>Phone Number</label>
        <input type="text" v-model="phone" :disabled="!isEditing" :class="{'edit-mode': isEditing}" />
      </div>
      <button class="edit-button" @click="toggleEdit">{{ isEditing ? 'SUBMIT' : 'EDIT' }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      phone: '123 - 456 - 7890',
      isEditing: false,
    };
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
  },
};
</script>

<style scoped>
.profile-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fc;
}
.edit-container {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  position: relative;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.edit-icon {
  position: absolute;
  bottom: 5px;
  right: 85px;
  font-size: 18px;
  cursor: pointer;
  color: #1e3a8a;
}
.user-info {
  font-size: 14px;
  color: gray;
}
.input-group {
  margin: 10px 0;
  text-align: left;
}
.input-group label {
  font-size: 14px;
  color: gray;
}
.input-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  color: black;
  background: #ffffff;
  transition: background 0.3s;
}
.input-group input.edit-mode {
  background: #e6f0ff; 
}
.edit-button {
  background: #1e3a8a;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
