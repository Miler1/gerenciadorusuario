package com.algaworks.comercial.util;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;

public class ChunkRequest implements Pageable{
	
	private int limit = 0;
	private int offset = 0;
	
	public ChunkRequest(int skip, int offset) {
	    if (skip < 0)
	        throw new IllegalArgumentException("Skip must not be less than zero!");

	    if (offset < 0)
	        throw new IllegalArgumentException("Offset must not be less than zero!");

	    this.limit = offset;
	    this.offset = skip;
	}

	@Override
	public int getPageNumber() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getPageSize() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long getOffset() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Sort getSort() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pageable next() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pageable previousOrFirst() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pageable first() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean hasPrevious() {
		// TODO Auto-generated method stub
		return false;
	}

}
