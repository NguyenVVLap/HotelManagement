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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "deductions")
public class Deduction {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "deduction_id")
	private long deductionId;
	
	private String description;
	
	@Column(name = "deduction_date")
	private Date deductionDate;
	
	@Column(name = "deduction_money")
	private double deductionMoney;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "employee_id")
	private Employee employee;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "payroll_id")
	private Payroll payroll;
}
