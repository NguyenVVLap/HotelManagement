package com.example.hotelserver.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "attendances")
public class Attendance {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "attendance_id")
	private long attendanceId;
	
	@Column(name = "attendance_date")
	private Date attendanceDate;
	
	@Column(name = "is_present")
	private boolean isPresent;
	
	private String note;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "asignment_id")
	private Asignment asignment;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "payroll_id")
	private Payroll payroll;
}
