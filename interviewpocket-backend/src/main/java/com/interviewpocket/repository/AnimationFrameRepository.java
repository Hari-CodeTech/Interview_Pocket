package com.interviewpocket.repository;

import com.interviewpocket.model.AnimationFrame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnimationFrameRepository extends JpaRepository<AnimationFrame, Long> {
    List<AnimationFrame> findByVisualAnimationIdOrderByFrameNumberAsc(Long visualAnimationId);
}

