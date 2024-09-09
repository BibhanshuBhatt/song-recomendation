package com.musicrecomend.musick.service;

import com.musicrecomend.musick.model.Song;
import com.musicrecomend.musick.model.User;
import com.musicrecomend.musick.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {
    @Autowired
    private SongRepository songRepository;

    public List<Song> recommendSongs(User user, String genre) {
        return songRepository.findByGenre(genre);
    }
}


