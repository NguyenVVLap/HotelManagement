package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.entity.Role;
import com.example.hotelserver.entity.User;



public interface UserService {
	public User addUser(User user);
	public Role addRole(Role role);
	public void addRoleToUser(String username, String roleName);
	public User getUser(String username);
	public User getUserById(long id);
	public List<User> getUsers();
}
