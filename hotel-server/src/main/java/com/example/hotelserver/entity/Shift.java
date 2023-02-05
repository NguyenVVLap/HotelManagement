package com.example.hotelserver.entity;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "shifts")
public class Shift {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "shift_id")
	private long shiftId;
	
	@Column(name = "shift_name")
	private String shiftName;
	
	@Column(name = "start_work_time")
	private LocalTime startWorkTime;
	
	@Column(name = "end_work_time")
	private LocalTime endWorkTime;
}
