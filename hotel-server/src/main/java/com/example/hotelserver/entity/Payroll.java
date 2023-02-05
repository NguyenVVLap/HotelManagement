package com.example.hotelserver.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "payrolls")
public class Payroll {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "payroll_id")
	private long payrollId;
	
	private double tax;
	
	@Column(name = "basic_salary")
	private double basicSalary;
	
	@Column(name = "payroll_month")
	private int payrollMonth;
	
	@Column(name = "date_created")
	private Date dateCreated;
	
	@Column(name = "total_salary")
	private double totalSalary;
	
	@OneToMany(mappedBy = "payroll", fetch = FetchType.EAGER)
	private List<Attendance> attendances;
	
	@OneToMany(mappedBy = "payroll", fetch = FetchType.EAGER)
	private List<Allowance> allowances;
	
	@OneToMany(mappedBy = "payroll", fetch = FetchType.EAGER)
	private List<Deduction> deductions;
	
	
}
