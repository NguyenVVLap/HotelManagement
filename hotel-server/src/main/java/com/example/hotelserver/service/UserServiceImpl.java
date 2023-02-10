package com.example.hotelserver.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.hotelserver.entity.Role;
import com.example.hotelserver.entity.User;
import com.example.hotelserver.repository.RoleRepo;
import com.example.hotelserver.repository.UserRepo;



@Service
public class UserServiceImpl implements UserService, UserDetailsService {
	private final UserRepo userRepo;
	private final RoleRepo roleRepo;
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	public UserServiceImpl(UserRepo userRepo, RoleRepo roleRepo, PasswordEncoder passwordEncoder) {
		this.userRepo = userRepo;
		this.roleRepo = roleRepo;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByUsername(username).get();
		
		if(user == null) {
			System.out.println("User not found in database");
			throw new UsernameNotFoundException("User not found in database");
		} else {
			System.out.println("User found in database: " + username);
		}
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(user.getRole().getName()));
		return new org.springframework.security.core.userdetails.User(user.getUsername()
				, user.getPassword(), authorities);
	}
	
	@Override
	public User addUser(User user) {
		System.out.println("Saving new user " + user.getUsername() + " to database");
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		return userRepo.save(user);
	}

	@Override
	public Role addRole(Role role) {
		System.out.println("Saving new role " + role.getName() + " to database");
		return roleRepo.save(role);
	}

	@Override
	public void addRoleToUser(String username, String roleName) {		
		System.out.println("Adding role " + roleName + " to user " + username);
		Optional<User> temp = userRepo.findByUsername(username);
		User user = temp.get();
		Role role = roleRepo.findByName(roleName);
		if (role == null) {
			roleRepo.save(new Role(0, roleName));
		}
		user.setRole(role);
		userRepo.save(user);
	}

	@Override
	public User getUser(String username) {
		System.out.println("Fetching user " + username);
		return userRepo.findByUsername(username).get();
	}

	@Override
	public List<User> getUsers() {
		System.out.println("Fetching all users");
		return userRepo.findAll();
	}

	@Override
	public User getUserById(long id) {
		User user = null; 
		Optional<User> result = userRepo.findById(id);
		
		if (result.isPresent()) {
			user = result.get();
		} else {
			throw new RuntimeException("Don't find employee id - " + id);
		}
		
		return user;
	}
	

}
